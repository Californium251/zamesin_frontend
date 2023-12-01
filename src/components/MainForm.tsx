import React, { FC, useState } from 'react';
import { useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormDescription, FormHeader } from './FormElements.tsx';
import FormMode from './FormMode.tsx';
import { onSubmit } from './onSubmit.ts';

const MainForm: FC = () => {
    const [formState, setFormState] = useState<FormMode>('airtable');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const handleFormChange = (value: string) => {
        setFormState(value as FormMode);
    };
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        onSubmit: onSubmit(formState, setIsSubmitting)
    })

    return (
        <Form onSubmit={formik.handleSubmit} style={{
            border: '1px solid #ccc',
            borderRadius: '12px',
            padding: '20px',
            backgroundColor: 'white',
            filter: 'drop-shadow(0 0 12px rgba(0, 0, 0, 0.5))',
            maxWidth: '800px',
        }}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: '3fr 1fr',
                gridTemplateRows: 'auto',
                gridGap: '20px',
                alignItems: 'start',
            }}>
                <FormHeader mode={formState} />
                <ToggleButtonGroup type="radio" name="options" defaultValue='airtable' onChange={handleFormChange}>
                    <ToggleButton id="add-to-airtable" value='airtable'>Добавить в Airtable</ToggleButton>
                    <ToggleButton id="create-user" value='strapi'>Добавить в Strapi</ToggleButton>
                </ToggleButtonGroup>
                <FormDescription mode={formState} />
            </div>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    placeholder="Enter email"
                />
                <Form.Text className="text-muted">
                    {formState === 'airtable'
                        ? 'Вводить тот имейл, к которому имеешь доступ.'
                        : 'Вводи тот же имейл, который создавал в Эиртейбл, чтобы проверить, работает ли АПИ.'}
                </Form.Text>
            </Form.Group>
            <Button variant={formState === 'airtable' ? 'primary' : 'success'} type="submit" disabled={isSubmitting} style={{ width: '310px', position: 'relative' }}>
                Создать пользователя в {formState === 'airtable' ? 'Airtable' : 'Strapi'}
                {isSubmitting && <Spinner animation="border" size="sm" style={{
                    position: 'absolute',
                    right: '10px',
                    top: '10px',
                }} />}
            </Button>
        </Form>
    );
};

export default MainForm;