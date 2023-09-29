export interface Notification {
	status: string;
	message: string;
}

export enum StorageName {
	ACTIVE_TAB = 'active-tab',
	EDITOR_STATE = 'editor-state',
	EDITOR_VALUE = 'editor-value',
}
