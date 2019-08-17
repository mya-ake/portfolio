import { getPageContent, getPostContent } from '../gateways';
import { createContentsMiddleware } from './../seeds';

export const pageContentsMiddleware = createContentsMiddleware(getPageContent);
export const postContentsMiddleware = createContentsMiddleware(getPostContent);
