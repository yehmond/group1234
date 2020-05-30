import React, { Component } from "react";
import { RBProps } from "./RegisterBarbershopContainer";
import MenuAppBar from "../NavBar/NavBar";
import './RegisterBarbershop.scss';
import RBSForm from "./RegisterBarbershopForm";

interface RBState {
  
}

class RegisterBarbershop extends Component<RBProps, RBState> {

    constructor(props: RBProps) {
        super(props);
    }
  
  render() {
    return (
        <div>
        <MenuAppBar/>
        <div id="rbs-page-content">

          <h1>Add Barbershop</h1>
          <div id="form-content">
              <RBSForm/>
          </div>
         </div>
        </div>
    );
  }
}

export default RegisterBarbershop;
