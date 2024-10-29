import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Typography,
  Tabs,
} from "@material-tailwind/react";
import { OwnerProfileTabs } from "./OwnerProfileTabs";
import { OWNER } from "../utilities/dummydata";

export function OwnerProfile({ baseURl }) {
  return (
    <Card shadow={true} variant="gradient" color="white">
      <CardHeader floated={false} color="gray" className="rounded-b-none">
        <Typography variant="h2">
          {OWNER.firstname} {OWNER.lastname}
        </Typography>
      </CardHeader>
      <CardBody>
        <Typography variant="h4">Contact Information</Typography>
        <ul>
          <li>Phone: {OWNER.phone}</li>
          <li>Email: {OWNER.email}</li>
        </ul>
        <Typography variant="h4">Emergency Contact</Typography>
        <ul>
          <li>Phone: {OWNER.ecphone}</li>
          <li>Email: {OWNER.ecemail}</li>
        </ul>
        <OwnerProfileTabs baseURL={baseURl} />
      </CardBody>
      <CardFooter className="gap-4 pet-profile-footer">
        <a href={""}>
          <Button>Edit</Button>
        </a>
      </CardFooter>
    </Card>
  );
}
