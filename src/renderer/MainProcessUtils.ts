import {
	CreateProjectDirectoryChannel,
	GetDirectoryChannel,
	GetFileContentsChannel,
	GetNewProjectLocationChannel,
	MenuNewProjectChannel, MenuNotImplementedChannel,
	MenuOpenProjectChannel,
	MenuProjectSettingsChannel,
	OpenProjectChannel, RenameFileChannel,
	SaveFileChannel
} from '../shared/Channels';

export interface MainProcessUtils {
	// TODO: I tried making a custom utility type to avoid all this duplication, but Typescript got mad. I got better
	//       things to do so I moved on, but I tried this:
	//       type ChannelResponse<T extends ReturnType<typeof createInvokableChannel>> = ReturnType<T>["invoke"];
	//       openProject: ChannelResponse<typeof OpenProjectChannel>
	//       Error: Type '(data: void) => Promise<EditorFile>' is not assignable to type '(data: unknown) => Promise<unknown>'.
	openProject: ReturnType<typeof OpenProjectChannel>["invoke"];
	getNewProjectLocation: ReturnType<typeof GetNewProjectLocationChannel>["invoke"];
	getDirectory: ReturnType<typeof GetDirectoryChannel>["invoke"];
	getFileContents: ReturnType<typeof GetFileContentsChannel>["invoke"];
	createProjectDirectory: ReturnType<typeof CreateProjectDirectoryChannel>["invoke"];
	saveFile: ReturnType<typeof SaveFileChannel>["invoke"];
	renameFile: ReturnType<typeof RenameFileChannel>["invoke"];

	handleMenuNewProject: ReturnType<typeof MenuNewProjectChannel>["listen"];
	handleMenuOpenProject: ReturnType<typeof MenuOpenProjectChannel>["listen"];
	handleMenuProjectSettings: ReturnType<typeof MenuProjectSettingsChannel>["listen"];

	// TODO: Remove once everything is good to go
	handleMenuNotImplemented: ReturnType<typeof MenuNotImplementedChannel>["listen"];
}

// window.ipc is populated from preload.ts, which is run before any react code is active.
export const MainProcess: MainProcessUtils = (window as any).ipc;
