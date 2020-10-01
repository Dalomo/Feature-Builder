import { Constants } from './constants';

export const getFileLocation = (filename: string) :string => {
    return process.argv[1].replace(Constants.moduleLocation, filename);
}

export const getFile = (filename: string) : any => {
    let filelocation = getFileLocation(filename);

    return require(filelocation);
} 