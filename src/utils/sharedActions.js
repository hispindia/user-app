import store from '../store';
import { getList, showSnackbar, hideSnackbar, showSharingDialog } from '../actions';
import i18n from '@dhis2/d2-i18n';

export const deleteModel = ({ confirmMsg, successMsg, errorMsg, model, entityType }) => {
    const snackbarProps = {
        message: confirmMsg,
        action: i18n.t('Confirm'),
        autoHideDuration: null,
        onActionClick: () => onRemoveConfirm(model, successMsg, errorMsg, entityType),
    };
    store.dispatch(showSnackbar(snackbarProps));
};

const onRemoveConfirm = async (model, successMsg, errorMsg, entityType) => {
    store.dispatch(hideSnackbar());

    try {
        await model.delete();
        store.dispatch(showSnackbar({ message: successMsg }));
        store.dispatch(getList(entityType));
    } catch (error) {
        store.dispatch(showSnackbar({ message: errorMsg }));
    }
};

export const openSharingSettings = ({ data: model }) => {
    store.dispatch(showSharingDialog(model.id, model.modelDefinition.name));
};
