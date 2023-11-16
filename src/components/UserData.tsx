import React, { useEffect, useState } from "react";
import { apiUrl, Service } from "@hex-labs/core";
import { SimpleGrid, Text, Button } from "@chakra-ui/react";
import axios from "axios";
import UserCard from "./UserCard";

const UserData: React.FC = () => {

  // The useState hook is used to store state in a functional component. The
  // first argument is the initial value of the state, and the second argument
  // is a function that can be used to update the state. The useState hook
  // returns an array with the first element being the state and the second
  // element being the function to update the state.

  const [users, setUsers] = useState<any[]>([]);

  // The useEffect hook basicaly runs the code inside of it when the component
  // mounts. This is useful for making API calls and other things that should
  // only happen once when the component is loaded.

  useEffect(() => {

    const getUsers = async () => {

      const URL = 'https://users.api.hexlabs.org/users/hexlabs';
      const res = await axios.get(apiUrl(Service.USERS, URL));
      let users = res.data;
      users = users.filter((user: any) => user.phoneNumber?.startsWith('470'));

      setUsers(users);
    };
    document.title = "Hexlabs Users"
    getUsers();
  }, []);
  // ^^ The empty array at the end of the useEffect hook tells React that the
  // hook should only run once when the component is mounted. If you want it to
  // run every time a variable changes, you can put that variable in the array
  // and it will run every time that variable changes.


  // TODO: Create a function that sorts the users array based on the first name of the users. Then, create a button that
  // calls this function and sorts the users alphabetically by first name. You can use the built in sort() function to do this.
  // You can also use the built in reverse() function to reverse the order of the array.
  const sortFirstName = () => {
    const sortedUsers = users.sort((a, b) => {
      if (a.name.first < b.name.first) {
        return -1;
      }
      if (a.name.first > b.name.first) {
        return 1;
      }
      return 0;
    }
    )
    setUsers((sortedUsers));
  }
  return (
    <>
      <Text fontSize="4xl">Hexlabs Users</Text>
      <Text fontSize="2xl">This is an example of a page that makes an API call to the Hexlabs API to get a list of users.</Text>
      <Button onClick={sortFirstName}>Sort by First Name</Button>

      <SimpleGrid columns={[2, 3, 5]} spacing={6} padding={10}>

        {/* Here we are mapping every entry in our users array to a unique UserCard component, each with the unique respective
        data of each unique user in our array. This is a really important concept that we use a lot so be sure to familiarize
        yourself with the syntax - compartmentalizing code makes your work so much more readable. */}
        { users.map((user) => (
          <UserCard user={user} key={user.userId} />
        ))}

      </SimpleGrid>
    </>
  );
};

export default UserData;