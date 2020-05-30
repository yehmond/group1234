import { connect } from "react-redux";
import RegisterBarbershopForm from "./RegisterBarbershopForm";

interface RBStateToProps {}

interface RBDispatchToProps {
}

export type RBProps = RBStateToProps & RBDispatchToProps;

const mapStateToProps = (): RBStateToProps => {
    return {} as RBStateToProps;
};

const mapDispatchToProps = (): RBDispatchToProps => {
    return {
    } as RBDispatchToProps;
};

export default connect<RBStateToProps, RBDispatchToProps, {}, {}>(
    mapStateToProps,
    mapDispatchToProps
)(RegisterBarbershopForm);
