import React, { Component } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import {
  Container,
  Content,
  Text,
  Form,
  Item,
  Input,
  Icon,
  Button,
  Header,
  Body,
  Title,
  Toast,
  Spinner
} from 'native-base';
import { Auth } from 'aws-amplify';
import { Formik, Field, ErrorMessage } from 'formik';
import moment from 'moment';
import * as Yup from 'yup';


const inputComponent = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
    <Item error={touched[field.name] && errors[field.name] ? true : false}>
      <Icon active name={props.icon} />
      <Input value={field.value} onChangeText={field.onChange(field.name)} onBlur={field.onBlur(field.name)} placeholder={props.placeholder} secureTextEntry={props.type === 'password'} />
    </Item>
  );

const errorComponent = ({ children }) => (
  <Text style={styles.errorMessage}>{children}</Text>
);
export default class Login extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.loginSchema = Yup.object().shape({
      username: Yup.string()
        .required('Valor no puede ser vacio'),
      password: Yup.string()
        .required('Valor no puede ser vacio')
    });
  }

  handleSubmit = async (values, { setSubmitting }) => {
    const { username, password } = values;
    try {
      let user = await Auth.signIn(username.toLowerCase(), password);
      console.log("user", (await Auth.currentSession()).getAccessToken());
      setSubmitting(false);
      this.props.navigation.navigate('App');
    } catch (err) {
      console.log('error: ', err);
      setSubmitting(false);
      Toast.show({
        text: "Credenciales Inválidas!",
        duration: 2000,
        position: "top",
        type: "error",
        textStyle: { textAlign: "center" }
      });
    }
  }
  render() {
    return (
      <Container>
        <Header style={{ height: 200 }}>
          <Body style={{ alignItems: "center" }}>
            <Icon name="flash" style={{ fontSize: 104 }} />
            <Title>Servicio de Actas</Title>
            <View padder>
              <Text style={{ color: Platform.OS === "ios" ? "#000" : "#FFF" }}>
                SETELAC
							</Text>
            </View>
          </Body>
        </Header>
        <Content padder>
          <Formik
            initialValues={{ username: '', password: '' }}
            onSubmit={this.handleSubmit}
            validationSchema={this.loginSchema}
          >
            {({ handleChange, handleSubmit, values, isSubmitting, isValid }) => (
              <Form>
                <Field name="username" component={inputComponent} icon="person" placeholder="Usuario" />
                <ErrorMessage name="username" component={errorComponent} />
                <Field name="password" component={inputComponent} icon="lock" placeholder="Contraseña" type="password" />
                <ErrorMessage name="password" component={errorComponent} />
                <Button
                  disabled={!isValid}
                  block
                  style={styles.submitButton}
                  onPress={handleSubmit}
                >
                  {isSubmitting &&
                    <Spinner color='blue' />
                  }
                  <Text>{isSubmitting ? 'Validando' : 'Ingresar'}</Text>
                  {/* <Text>Ingresar</Text> */}
                </Button>
              </Form>
            )}
          </Formik>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  submitButton: {
    marginTop: 20
  },
  errorMessage: {
    fontSize: 12,
    color: 'red',
    alignSelf: 'flex-end',
    paddingTop: 5,
    paddingBottom: 5
  }
})