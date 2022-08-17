import { bindActionCreators } from 'redux';
import * as Actions from '../Redux/Action';
export function mapStateToProps(state) {
    return {
        ...state
    };
}
export function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}
