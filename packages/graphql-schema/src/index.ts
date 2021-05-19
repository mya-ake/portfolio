import fs from 'fs';
import path from 'path';

const projectDir = path.resolve(__dirname, '..');
const schemaPathname = path.join(projectDir, 'schema', 'schema.graphql');

export const getSchema = (): string =>
  fs.readFileSync(schemaPathname, { encoding: 'utf-8' });
