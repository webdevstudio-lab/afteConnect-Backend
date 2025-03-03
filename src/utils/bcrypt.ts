import bcrypt from 'bcrypt';

export const hashValue = async(value: string, salteRound: number = 12): Promise<string> => 
    await bcrypt.hash(value, salteRound); 

export const compareValue = async(value: string, hash: string): Promise<boolean> => 
    await bcrypt.compare(value, hash);