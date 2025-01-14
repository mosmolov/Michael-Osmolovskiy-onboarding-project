import { Box, Flex, HStack, Text, Link, Button } from "@chakra-ui/react";
import React from "react";
import UserModal from "./UserModal";
import HexathonModal from "./HexathonModal";
import { apiUrl, Service } from "@hex-labs/core";
import axios from "axios";
type Props = {
  user: any;
};

// TODO: right now, the UserCard only displays the user's name and email. Create a new modal component <UserModal> that
// pops up when the card is clicked. In this modal, list all the user's information including name, email, phoneNumber,
// and userId.

// TODO: Explore if you can display the email as a link to the user's email that will open up the user's
// email client and start a new email to that user. Also explore if you can provide a link to the user's resume.

// TODO: In our database structure, every user has a userId that is unique to them. This is the primary key of the user
// and is referenced in their applications to all of our hexathons. Create a button that when clicked, will retrieve all of
// the hexathons that the user has applied to. You can use the /applications endpoint of the registration service to do this
// and the /hexathons endpoint of the hexathons service to get a list of all the hexathons.

const UserCard: React.FC<Props> = (props: Props) => {
  const [showUserModal, setShowUserModal] = React.useState(false);
  const [showHexathonModal, setShowHexathonModal] = React.useState(false);
  const [appliedHexathons, setAppliedHexathons] = React.useState<any[]>([]);
  const retrieveAppliedHexathons = async (userId: String) => {
    const URL = "hexathons";
    const res = await axios.get(apiUrl(Service.HEXATHONS, URL));
    let hexathons = res.data;
    const appliedHexathons: any[] = [];
    hexathons.forEach(async (hexathon: { id: String }) => {
      let URL = `hexathon-users/${hexathon.id}/users`;
      const res = await axios.get(apiUrl(Service.HEXATHONS, URL));
      if (res.data) {
        appliedHexathons.push(
          hexathons.find((hex: { id: String }) => hex.id === hexathon.id)
        );
      }
      setAppliedHexathons(appliedHexathons);
    });
  };
  // useEffect to retrieve appliedHexathons
  React.useEffect(() => {
    retrieveAppliedHexathons(props.user.userId);
  }, []);
  return (
    <>
    <Box borderWidth="1px" rounded="lg" boxShadow="lg" height="100%" fontWeight="bold" alignItems="center">
    <Button width="100%"
          onClick={() => {
            setShowHexathonModal(true);
          }}
        >
          View Hexathons
        </Button>
      <Box
        borderWidth="1px"
        rounded="lg"
        boxShadow="lg"
        height="175px"
        fontWeight="bold"
        alignItems="center"
        onClick={() => setShowUserModal(true)}
      >
        <Flex padding="2" flexDirection="column">
          <HStack align="flex-end" justify="space-between">
            <Text fontSize="xl">{`${props.user.name.first} ${props.user.name.last}`}</Text>
          </HStack>
          <Text
            fontSize="sm"
            fontWeight="semibold"
            justifyContent="justify"
            mt="2"
          >
            <Link color="blue" href={`mailto:${props.user.email}`}>
              {props.user.email}
            </Link>
          </Text>
        </Flex>
      </Box>
      </Box>
      <HexathonModal
        showHexathonModal={showHexathonModal}
        onClose={() => setShowHexathonModal(false)}
        user={props.user}
        appliedHexathons={appliedHexathons}
      />
      <UserModal
        showUserModal={showUserModal}
        onClose={() => setShowUserModal(false)}
        user={props.user}
      />
    </>
  );
};

export default UserCard;
