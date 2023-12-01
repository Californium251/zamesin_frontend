import { toast } from 'react-toastify';
import Airtable from 'airtable';
import axios from 'axios';
import checkIfUserExists from './checkIfUserExists.ts';

export const onSubmit = (formState, setIsSubmitting) => async (values) => {
    if (formState === 'airtable') {
        try {
            setIsSubmitting(true);
            if (await checkIfUserExists(values.email)) {
                toast.warn('Такой пользователь уже существует в Airtable. Так что можно переходить к тестированию API.');
                setIsSubmitting(false);
                return;
            }
            const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base(process.env.REACT_APP_AIRTABLE_BASE_ID as string);
            const tableName = process.env.REACT_APP_TABLE_NAME || 'Table 1';
            await base(tableName).create([{ fields: { Email: values.email } }]);
            toast.success('Пользователь добавлен в Airtable');
            setIsSubmitting(false);
        } catch (e) {
            toast.error(e.message);
            setIsSubmitting(false);
        }
    }
    if (formState === 'strapi') {
        try {
            setIsSubmitting(true);
            const res = await axios.get(process.env.REACT_APP_API_URL as string, {
                params: {
                    email: values.email,
                },
                headers: {
                    "Content-Type": "application/json",
                }
            });
            console.log(res);
            toast.success('Пользователь добавлен в Strapi');
            setIsSubmitting(false);
        } catch (e) {
            if (e.response.status === 409) {
                toast.warn('Такой пользователь уже существует в Strapi. Можно проверять имейл.');
                setIsSubmitting(false);
                return;
            }
            if (e.response.status === 403) {
                toast.error('Этого пользователя нет в Airtable. Сперва добавьте его туда, а уже потом в Strapi.');
                setIsSubmitting(false);
            }
        }
    }
};
