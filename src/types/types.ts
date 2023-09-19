
// Responses
export type O2AuthResponse = { access_token: string, token_type: 'Bearer', expires_in: number };
export type StoryboardResponse = { storyboard_id: number, name: string, thumbnail_time: number, width: number, height: number, thumbnail: string, data: StoryboardElement[], last_modified: number, last_modified_string: string };
export type VideoGenerateResponse = { output: OutputRoot, total_cost: number, check_status_url: string };
export type ErrorResponse = { errors: IdomooError[] };
export type CheckStatusResponse = { id: string, status: VideoStatus };

// Requests
export type GenerateVideoRequest = { storyboard_id: number, data: GenerateVideoDataElement[], output: OutputRoot };

// Inner 
export type StoryboardElement = { key: string, val: string, description: string };
export type GenerateVideoDataElement = Omit<StoryboardElement, 'description'>;
export type OverlayImage = { path: string };
export type VideoSpecs = { format: VideoFormats, quality: number, height: number, duration: number, cost: number, links: { url: string } };

// Outputs
export type VideoOutput = { format: VideoFormats, quality?: number, height: number, overlays: OverlayImage[] };
export type GIFOutput = {}
export type OutputRoot = { video?: VideoOutput[] | VideoSpecs[], gif?: GIFOutput[] };

// Literals
export type VideoFormats = 'mp4' | 'hls' | 'webm';
export type VideoStatus = 'VIDEO_AVAILABLE' | 'RENDERING' | 'IN_PROCESS' | 'IN_QUEUE' | 'ERROR' | 'NOT_EXIST';

// Errors
export type IdomooError = { error_code: number, error_message: string, error_description: string };
