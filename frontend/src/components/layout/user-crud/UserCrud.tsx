import * as React from 'react';
import styled from '@emotion/styled';
import { DynamicList } from '../dynamic-list/DynamicList';
import axios from 'axios';
import { DEVELOPMENT_URL } from '../../../utils/utils';
import { Navbar } from '../navbar/Navbar';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100%;
`;

const ListContainer = styled.div`
  padding: 2vh;
`;

export const UserCrud = (): JSX.Element => {
  const [users, setUsers] = React.useState([{}]);
  const getUsers = (): Promise<any> => {
    axios.defaults.withCredentials = true;
    return axios
      .post(DEVELOPMENT_URL + '/v1/user/filter', {})
      .then((response) => response.data)
      .catch((error) => error);
  };

  React.useEffect(() => {
    getUsers().then((data) => {
      if (data === Error) {
        console.log(data);
      } else {
        setUsers(data);
      }
    });
  }, []);

  return (
    <Container>
      <Navbar />
      <ListContainer>
        <DynamicList objs={users} />
      </ListContainer>
    </Container>
  );
};
