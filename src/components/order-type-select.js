import React, { Component } from 'react';
import {
  Item,
  Label,
  Picker
} from 'native-base';
import { Query, graphql } from "react-apollo";
import GET_ORDER_TYPES from '../services/queries/get-order-types';

class OrderTypeSelect extends Component {
  constructor(props) {
    super(props);
    console.log('init');
  }

  render() {
    const {
      field,
      form: { touched, errors, handleChang, setFieldTouched, setFieldValue },
      onValueChange,
      ...props
    } = this.props;
    return (
      <Item
        picker
        stackedLabel
        error={touched[field.name] && errors[field.name] ? true : false}
      >
        <Label>{props.label}</Label>
        <Query query={GET_ORDER_TYPES}>
          {({ loading, error, data }) => {
            return (
              <Picker
                mode="dropdown"
                style={{ width: '100%' }}
                selectedValue={field.value}
                onValueChange={(val) => {
                  setFieldValue(field.name, val);
                  if (!touched[field.name]) {
                    setFieldTouched(field.name);
                  }
                }}
              >
                <Picker.Item label={props.placeholder} value="" />
                { data.getOrderTypes ?
                  data.getOrderTypes.map((item, index) => (
                    <Picker.Item key={item.id} label={item.label} value={item.id} />
                  )) :
                  []
                }
              </Picker>
            );
          }}
        </Query>
      </Item>
    );
  }
}

export default OrderTypeSelect;