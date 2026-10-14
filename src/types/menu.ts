export type SizeId = 'mini' | 'std' | 'vip';

export interface MenuIO {
	id: string;
	label: string;
	gen: string; 
	sizes: Partial<Record<SizeId, number>>;
	addons: boolean;
};