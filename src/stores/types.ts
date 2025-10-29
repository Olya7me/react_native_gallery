export interface PinType {
	id: number;
	title: string;
	url: string;
	description: string;
	ratio: number;
}

export interface ApiPhoto {
	id: number;
	url: string;
	title: string;
	description: string;
	user: number;
}

export interface ApiResponse {
	photos: ApiPhoto[];
}
