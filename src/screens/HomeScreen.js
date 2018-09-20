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

export default class Main extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.activitySchema = Yup.object().shape({
      orderId: Yup.string()
        .required('Valor no puede ser vacio'),
      osId: Yup.string()
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
      activityOptions: [
        {
          key: "quit",
          label: "Corte",
          items: [
            {
              key: "spb",
              label: "suspension de base"
            },
            {
              key: "spm",
              label: "suspension en la mufa"
            },
            {
              key: "spp",
              label: "suspension en el poste"
            },
            {
              key: "spt",
              label: "suspension en tendido"
            },
            {
              key: "spa",
              label: "suspension con retiro de acometida"
            }
          ],
        },
        {
          key: "reconnection",
          label: "Reconexion",
          items: [
            {
              key: "rb",
              label: "reconexion de base"
            },
            {
              key: "rm",
              label: "reconexion en la mufa"
            },
            {
              key: "rp",
              label: "reconexion en el poste"
            },
            {
              key: "rt",
              label: "reconexion en tendido"
            },
            {
              key: "ra",
              label: "reconexion con retiro de acometida"
            }
          ],
        },
        {
          key: "failed",
          label: "Fallida",
          items: [
            {
              key: "pd",
              label: "predio o casa demolida"
            },
            {
              key: "rec",
              label: "en reclamo"
            },
            {
              key: "si",
              label: "servicio inexistente"
            },
            {
              key: "amn",
              label: "abonado aplico a la amnistia"
            },
            {
              key: "cancel",
              label: "cliente ha cancelado"
            },
            {
              key: "susp",
              label: "serivicio suspendido"
            },
            {
              key: "zpel",
              label: "zona peligrosa"
            }
          ],
        }
      ]
    };
  }

  componentDidMount() {
    // do stuff while splash screen is shown
      // After having done stuff (such as async tasks) hide the splash screen
      SplashScreen.hide();
  }

  _showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true })
  };

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  handleSubmit = (values, { setSubmitting }) => {
    // console.log('values', values);
    setTimeout(() => {
      console.log('values', values);
      Toast.show({
        text: "Actividad enviada correctamente!",
        duration: 3000,
        type: 'success'
      });
      setSubmitting(false);
    }, 5000);
  }

  timeInputConfirm = (date, formProps) => {
    var selectedDate = moment(date);
    formProps.setFieldValue('timeCompletedObject', selectedDate);
    formProps.setFieldValue('timeCompleted', selectedDate.format("HH:mm"));
    this._hideDateTimePicker();
  }

  getActivityDetailOptions = (type) => {
    const { activityOptions } = this.state;
    var items = [];
    for (var i = 0; i < activityOptions.length; i++) {
      if (activityOptions[i].key === type) {
        activityOptions[i].items.map((item) => {
          items.push(item);
        });
      }
    }
    return items;
  }

  hideKeyboard = () => {
    Keyboard.dismiss();
  }

  render() {
    return (
      <Formik
        initialValues={{
          orderId: '',
          osId: '',
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
                <Field name="osId" component={inputComponent} label="Numero de OS" placeholder="Ingrese numero de OS" />
                <ErrorMessage name="osId" component={errorComponent} />
                <Field name="action" component={pickerComponent} label="Tipo de OS" placeholder="Seleccione tipo de OS" items={this.state.activityOptions} />
                <ErrorMessage name="action" component={errorComponent} />
                <Field name="actionDescription" component={pickerComponent} label="Accion Realizada" placeholder="Seleccione accion realizada" items={this.getActivityDetailOptions(props.values.action)} />
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
                      <Icon style={{ fontSize: 30  }} name='time' />
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