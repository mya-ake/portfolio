declare module 'http' {
  export interface IncomingMessage {
    content: {
      title: string;
      description: string;
      thumbnailUrl: string;
    };
  }
}
