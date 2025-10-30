import { makeAutoObservable, runInAction } from 'mobx';
import { Image } from 'react-native';
import { PinType, ApiPhoto, ApiResponse } from './types';

class PinStore {
	pins: PinType[] = [];
	loading = false;
	error: string | null = null;
	offset = 0;
	limit = 20;
	allLoaded = false;
	controller: AbortController | null = null;

	constructor() {
		makeAutoObservable(this);
	}

	fetchPins = async (): Promise<void> => {
		if (this.loading || this.allLoaded) return;

		this.controller?.abort();
		this.controller = new AbortController();

		this.loading = true;
		this.error = null;

		try {
			const response = await fetch(
				`https://api.slingacademy.com/v1/sample-data/photos?offset=${this.offset}&limit=${this.limit}`,
				{ signal: this.controller.signal },
			);

			if (!response.ok) {
				throw new Error(`Ошибка загрузки: ${response.status}`);
			}

			const data: ApiResponse = await response.json();

			const newPins: PinType[] = await Promise.all(
				data.photos.map(
					(photo: ApiPhoto) =>
						new Promise<PinType>(resolve => {
							Image.getSize(photo.url, (width, height) => {
								resolve({
									id: photo.id,
									title: photo.title,
									url: photo.url,
									description: photo.description,
									ratio: width / height,
								});
							});
						}),
				),
			);

			runInAction(() => {
				if (newPins.length === 0) {
					this.allLoaded = true;
				} else {
					this.pins.push(...newPins);
					this.offset += this.limit;
				}
				this.loading = false;
			});
		} catch (err) {
			runInAction(() => {
				this.loading = false;

				const error = err as { name?: string; message?: string };

				if (error.name === 'AbortError') {
					this.error = 'Загрузка отменена';
					return;
				}

				if (error.message?.includes('Ошибка загрузки')) {
					this.error = error.message;
				} else if (error.message) {
					this.error = 'Произошла ошибка: ' + error.message;
				} else {
					this.error = 'Неизвестная ошибка при загрузке данных';
				}
			});
		}
	};
}

export const pinStore = new PinStore();
