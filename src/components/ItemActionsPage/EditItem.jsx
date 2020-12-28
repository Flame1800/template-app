import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import BorderColorIcon from '@material-ui/icons/BorderColor';

import { connect } from "react-redux";
import * as actions from '../../actions'

const mapStateToProps = (state) => {
    return {};
}

const actionsCreator = {
    editItem: actions.editItem,
    fetchPosts: actions.fetchPosts,
}

function FormDialog(props) {
    const { item } = props;

    const [open, setOpen] = React.useState(false);
    const [form, setForm] = React.useState(item);

    const handleClickOpen = () => (e) => {
        e.preventDefault();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        props.editItem(form);
        setOpen(false);
    }

    const handeChange = () => (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        form[name] = value;
        const newForm = form;
        setForm(newForm);
    }
    return (
        <div>
            <div onClick={handleClickOpen()}>
                <BorderColorIcon />
            </div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Редактировать</DialogTitle>
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
                        defaultValue={form.name}
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
                        defaultValue={form.username}
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
                        defaultValue={form.phone}
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
                        defaultValue={form.email}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Отмена
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Ок
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}


const conntectedComponent = connect(mapStateToProps, actionsCreator)(FormDialog);
export default conntectedComponent;