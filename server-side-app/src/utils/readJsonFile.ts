import { readFile } from 'fs/promises';
import { join } from 'path';
import AppError from './AppError';

const jsonFileReader = async <T>(path: string): Promise<T> | never => {
  const filePath = join(path);
  try {
    const jsonData = await readFile(path, 'utf-8');
    const ObjectData = JSON.parse(jsonData);
    return ObjectData;
  } catch (err) {
    throw new AppError(`There is no file with this path ${filePath} `, 404);
  }
};

export default jsonFileReader;
