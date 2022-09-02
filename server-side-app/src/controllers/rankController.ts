import { NextFunction, Request, Response } from 'express';
import { join } from 'path';
import { ITestData } from '../inerfaces/ITestData';
import AppError from '../utils/AppError';
import catchAsync from '../utils/catchAsync';
import jsonFileReader from '../utils/readJsonFile';

// This function take a score list and the score which we want to calculate its rank
export const calculateRank = (scoreList: number[], score: number) => {
  let totalNumberOfScores = scoreList.length;

  // Calculate the count of numbers below this score in the score list
  let numberOfValuesBelowScore = scoreList.filter((s) => s < score).length;

  // This formula is used for calculating the percentile actually but we used the result as rank
  let rank = (numberOfValuesBelowScore / totalNumberOfScores) * 100;
  rank = parseFloat(rank.toFixed(2));
  return rank;
};

export const getRank = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { score } = <Partial<{ score: number; }>>req.body;
    const { scoresList } = await jsonFileReader<ITestData>(
      join(`${__dirname}../../../data/TestData.json`)
    );

    if (!score) return next(new AppError('There is no score given', 400));

    const rank = calculateRank(scoresList, score!);

    res.status(200).json({
      status: 'success',
      rank,
    });
  }
);
