import { makeAutoObservable, runInAction } from 'mobx';

export interface PinType {
	id: number;
	title: string;
	url: string;
	description: string;
	user: number;
}

interface ApiPhoto {
	id: number;
	url: string;
	title: string;
	description: string;
	user: number;
}

interface ApiResponse {
	photos: ApiPhoto[];
}

class PinStore {
	pins: PinType[] = [];
	loading: boolean = false;
	offset: number = 0;
	limit: number = 20;
	allLoaded: boolean = false;

	constructor() {
		makeAutoObservable(this);
	}

	fetchPins = async () => {
		if (this.loading || this.allLoaded) return;

		this.loading = true;
		try {
			const response = await fetch(
				`https://api.slingacademy.com/v1/sample-data/photos?offset=${this.offset}&limit=${this.limit}`,
			);

			const data: ApiResponse = await response.json();

			runInAction(() => {
				if (data.photos.length === 0) {
					this.allLoaded = true;
				} else {
					const newPins: PinType[] = data.photos.map(
						(photo: ApiPhoto) => ({
							id: photo.id,
							title: photo.title,
							url: photo.url,
							description: photo.description,
							user: photo.user,
						}),
					);

					this.pins.push(...newPins);
					this.offset += this.limit;
				}
				this.loading = false;
			});
		} catch (error) {
			console.error('Fetch error:', error);
			runInAction(() => {
				this.loading = false;
			});
		}
	};
}

export const pinStore = new PinStore();
