import { NextFunction, Request, Response } from 'express';
import { join } from 'path';
import { ITestData, IWordItem, PartOfSpeech } from '../inerfaces/ITestData';
import catchAsync from '../utils/catchAsync';
import jsonFileReader from '../utils/readJsonFile';

// This function group words by their Part of Speech and return Map of key: ParOfSpeech => value: WordList
const groupWordsArray = (wordList: IWordItem[]) => {
    const posArray = ['adverb', 'verb', 'noun', 'adjective'];
    const groupsMap = new Map<PartOfSpeech, IWordItem[]>();
    posArray.forEach((pos) => {
        groupsMap.set(
            pos as PartOfSpeech,
            wordList.filter((el) => el.pos === pos)
        );
    });
    return groupsMap;
};

// This function return random element form an array
const getRandomElementFromArray = <T>(arr: T[]) =>
    arr[Math.floor(Math.random() * arr.length)];

// Shuffle array elements in-place
const shuffleArray = <T>(arr: Array<T>) => {
    for (let i = arr.length - 1; i > 1; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
};

// This function take the groups map and length of the returned array,
// which returns an array of random elements from different groups which element from one group must appear at least one
const randomElementsFromDifferentGroups = (
    groupsMap: Map<PartOfSpeech, IWordItem[]>,
    length: number = 1
) => {
    const groupsArray = [...groupsMap];
    shuffleArray(groupsArray);
    let wordItemSet = new Set<IWordItem>();
    // To get at least one from different groups
    for (let i = 0; i < 4; i++) {
        wordItemSet.add(getRandomElementFromArray(groupsArray[i][1]));
    }
    let counter = 0;
    while (wordItemSet.size <= length) {
        const current = groupsArray[counter][1];
        current.forEach((wordItem) => {
            wordItemSet.add(wordItem);
        });
        ++counter;
    }

    // To get the exact array of the specified length
    return [...wordItemSet].splice(0, length);
};

export const getWords = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { wordList } = await jsonFileReader<ITestData>(
            join(`${__dirname}../../../data/TestData.json`)
        );

        const groups = groupWordsArray(wordList);
        const randomDifferentWords = randomElementsFromDifferentGroups(groups, 10);

        res.status(200).json({
            status: 'success',
            length: randomDifferentWords.length,
            data: randomDifferentWords,
        });
    }
);
