import * as React from "react";
import { Text, Container, List, ListItem, Content } from "native-base";
import { NavigationActions } from "react-navigation";
import { Auth } from 'aws-amplify';

const routes = [
	{
		route: "Auth",
		caption: "Salir",
	}
];

export default class Sidebar extends React.Component {
	render() {
		return (
			<Container>
				<Content>
					<List
						style={{ marginTop: 40 }}
						dataArray={routes}
						renderRow={data => {
							return (
								<ListItem
									button
									onPress={async () => {
                    if (data.route === "Auth") {
                      await Auth.signOut();
                    }
										this.props.navigation.navigate(data.route);
									}}
								>
									<Text>{data.caption}</Text>
								</ListItem>
							);
						}}
					/>
				</Content>
			</Container>
		);
	}
}
