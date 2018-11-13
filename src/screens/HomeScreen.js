/**
* Sample React Native App
* https://github.com/facebook/react-native
*
* @format
* @flow
*/

import React, { Component } from 'react';
import { StyleSheet, Keyboard, View, TouchableOpacity } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  Form,
  Item,
  Label,
  Input,
  Grid,
  Col,
  Root,
  Card,
  CardItem,
  Picker,
  Spinner,
  Toast
} from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Formik, Field, ErrorMessage } from 'formik';
import moment from 'moment';
import * as Yup from 'yup';
import SplashScreen from 'react-native-splash-screen'
import { Mutation, graphql } from "react-apollo";
import { Auth } from 'aws-amplify';
import ADD_ORDER from '../services/mutations/add-order';
import GET_ORDER_TYPES from '../services/queries/get-order-types';
import GET_ORDER_TYPE_ACTIONS from '../services/queries/get-order-type-actions';
import OrderTypeSelect from '../components/order-type-select';
import OrderActionsSelect from '../components/order-actions-select';

const inputComponent = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
    <Item
      stackedLabel
      error={touched[field.name] && errors[field.name] ? true : false}
    >
      <Label>{props.label}</Label>
      <Input placeholder={props.placeholder} value={field.value} onChangeText={field.onChange(field.name)} onBlur={field.onBlur(field.name)} />
    </Item>
  );

const pickerComponent = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors, handleChang, setFieldTouched, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
    <Item
      picker
      stackedLabel
      error={touched[field.name] && errors[field.name] ? true : false}
    >
      <Label>{props.label}</Label>
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
        {
          props.items.map((item, index) => {
            return <Picker.Item key={index} label={item.label} value={item.key} />;
          })
        }
      </Picker>
    </Item>
  );

const errorComponent = ({ children }) => (
  <Text style={styles.errorMessage}>{children}</Text>
);

class Main extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.activitySchema = Yup.object().shape({
      orderId: Yup.string()
        .required('Valor no puede ser vacio'),
      serviceOrderId: Yup.string()
        .required('Valor no puede ser vacio'),
      action: Yup.string()
        .required('Valor no puede ser vacio'),
      actionDescription: Yup.string()
        .required('Valor no puede ser vacio'),
    });

    this.state = {
      datePickerMode: 'time',
      chosenDate: new Date(),
      isDateTimePickerVisible: false,
      currentUser: ""
    };
    this.setUser();
  }

  componentDidMount() {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    SplashScreen.hide();

  }

  setUser = async () => {
    try {
      let session = (await Auth.currentSession()).getAccessToken();
      if (session) {
        this.setState({
          currentUser: session.payload.username
        });
      }
    } catch (err) {
      console.log('error: ', err)
    }
  }

  _showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true })
  };

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  handleSubmit = (values, { setSubmitting, resetForm }) => {
    // console.log('values', values);
    console.log('values', values);
    if (this.props.addOrder) {
      const { timeCompletedObject, timeCompleted, ...rest } = values;
      const order = {
          timeCompleted: "2018-11-10T14:48:00",
          userId: this.state.currentUser,
          ...rest
      }
      console.log('oorder', order)
      this.props.addOrder(order)
        .then((data) => {
          console.log('data', data);
          Toast.show({
            text: "Acta registrada correctamente!",
            duration: 3000,
            type: 'success'
          });
          setSubmitting(false);
          resetForm();
        })
        .catch((err) => {
          Toast.show({
            text: "Error al enviar acta!",
            duration: 3000,
            type: 'danger'
          });
          console.log('error', err);
          setSubmitting(false);
        });
    }
  }

  timeInputConfirm = (date, formProps) => {
    var selectedDate = moment(date);
    formProps.setFieldValue('timeCompletedObject', selectedDate);
    formProps.setFieldValue('timeCompleted', selectedDate.format("HH:mm"));
    this._hideDateTimePicker();
  }

  hideKeyboard = () => {
    Keyboard.dismiss();
  }

  render() {
    return (
      <Formik
        initialValues={{
          orderId: '',
          serviceOrderId: '',
          action: '',
          actionDescription: '',
          timeCompleted: moment().format("HH:mm"),
          timeCompletedObject: null
        }}
        onSubmit={this.handleSubmit}
        validationSchema={this.activitySchema}
      >
        {(props) => (
          <Container>
            <Header>
              <Left>
                <Button
                  transparent
                  onPress={() => {
                    this.props.navigation.openDrawer();
                  }}
                >
                  <Icon name='menu' />
                </Button>
              </Left>
              <Body>
                <Title>Enviar Acta</Title>
              </Body>
              <Right />
            </Header>
            <Content padder>
              <Form>
                <Field name="orderId" component={inputComponent} label="Numero de Acta" placeholder="Ingrese numero de acta" />
                <ErrorMessage name="orderId" component={errorComponent} />
                <Field name="serviceOrderId" component={inputComponent} label="Numero de OS" placeholder="Ingrese numero de OS" />
                <ErrorMessage name="serviceOrderId" component={errorComponent} />
                <Field name="action" component={OrderTypeSelect} label="Tipo de OS" placeholder="Seleccione tipo de OS" />
                <ErrorMessage name="action" component={errorComponent} />
                <Field name="actionDescription" component={OrderActionsSelect} label="Accion Realizada" placeholder="Seleccione accion realizada" typeId={props.values.action} />
                <ErrorMessage name="actionDescription" component={errorComponent} />
                <View>
                  <DateTimePicker
                    mode={this.state.datePickerMode}
                    isVisible={this.state.isDateTimePickerVisible}
                    datePickerModeAndroid="spinner"
                    is24Hour={false}
                    onConfirm={(date) => this.timeInputConfirm(date, props)}
                    onCancel={this._hideDateTimePicker}
                  />
                  <Grid>
                    <Col>
                      <Item stackedLabel>
                        <Label>Hora Completada</Label>
                        <Input disabled value={props.values.timeCompleted} placeholder="test" />
                      </Item>
                    </Col>
                    <Button style={{ alignSelf: 'flex-end' }} transparent onPress={this._showDateTimePicker}>
                      <Icon style={{ fontSize: 30 }} name='time' />
                    </Button>
                  </Grid>
                </View>
                <Button
                  block
                  disabled={!props.isValid}
                  onPress={props.handleSubmit}
                  style={styles.submitButton}
                >
                  {props.isSubmitting &&
                    <Spinner color='blue' />
                  }
                  <Text>{props.isSubmitting ? 'Salvando' : 'Salvar'}</Text>
                </Button>
              </Form>
            </Content>
          </Container>
        )}
      </Formik>
    );
  }
}

const withAddOrderMutation = graphql(ADD_ORDER, {
  props: ({ mutate }) => ({
    addOrder: order => mutate({ variables: { order } }),
  }),
});

export default withAddOrderMutation(Main);

const styles = StyleSheet.create({
  submitButton: {
    marginTop: 20
  },
  errorMessage: {
    fontSize: 12,
    color: 'red',
    alignSelf: 'flex-end',
    paddingTop: 5,
    paddingBottom: 5
  },
  pickerWrapper: {
    paddingTop: 10,
    paddingLeft: 15
  }
})