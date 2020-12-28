import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { connect } from "react-redux";
import * as actions from '../../actions'

const mapStateToProps = (state) => {
    return {};
}

const actionsCreator = {
    addItem: actions.addItem,
}

function FormDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [form, setForm] = React.useState({
        name: '',
        username: '',
        phone: '',
        email: '',
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        props.addItem(form);
        setOpen(false);
    }

    const handeChange = () => (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        const newForm = form;
        newForm[name] = value;
        setForm(newForm);
    }

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Добавить
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Добавить новый контакт</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        onInput={handeChange()}
                        id="name"
                        name="name"
                        label="Имя"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        onInput={handeChange()}
                        id="username"
                        name="username"
                        label="Никнейм"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        onInput={handeChange()}
                        id='phone'
                        name='phone'
                        label="Телефон"
                        type="phone"
                        fullWidth
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        onInput={handeChange()}
                        id="email"
                        name="email"
                        label="Email"
                        type="email"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Отмена
                    </Button>
                    <Button onClick={handleSubmit}>
                        Добавить
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}


const conntectedComponent = connect(mapStateToProps, actionsCreator)(FormDialog);
export default conntectedComponent;