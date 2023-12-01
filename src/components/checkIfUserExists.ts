import Airtable, { Base, FieldSet, Records } from 'airtable';

const base: Base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY })
    .base(process.env.REACT_APP_AIRTABLE_BASE_ID as string);
const tableName: string = process.env.TABLE_NAME || 'Table 1';

const checkIfUserExists: (email: string) => Promise<boolean | Error> = async (email: string) => {
    return new Promise((resolve, reject) => {
        base(tableName).select({
            view: 'Grid view',
            maxRecords: 1,
            filterByFormula: `{Email} = '${email}'`,
        }).firstPage((err: Error | null, records: Records<FieldSet> | undefined) => {
            if (err) {
                reject(err.message);
                return;
            }
            if (records !== undefined) {
                resolve(records.length > 0);
            }
        })
    });
};

export default checkIfUserExists;