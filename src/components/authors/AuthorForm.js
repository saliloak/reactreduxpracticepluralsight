import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const AuthorForm = ({ author, onSave, onChange, saving, errors }) => {
    return (
        <form>
            <h1>Manage Author</h1>
            <TextInput
                name="id"
                label="ID"
                value={author.id}
                placeholder="ID"
                onChange={onChange}
                error={errors.title} />

            <TextInput
                name="firstName"
                label="First Name"
                value={author.firstName}
                placeholder="First Name"
                onChange={onChange}
                error={errors.firstName} />

            <TextInput
                name="lastName"
                label="Last Name"
                value={author.lastName}
                placeholder="Last Name"
                onChange={onChange}
                error={errors.lastName} />

            <input type="submit" disabled={saving} className="btn btn-primary" onClick={onSave} value={saving ? 'Saving...' : 'Save'} />
        </form>
    );
};

export default AuthorForm;