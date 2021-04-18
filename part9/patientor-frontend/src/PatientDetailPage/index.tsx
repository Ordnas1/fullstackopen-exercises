import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { apiBaseUrl } from "../constants";
import { Patient, GenderIcon } from "../types";

import { Header, Icon } from "semantic-ui-react";

const PatientDetailPage = () => {
  const [patient, setPatient] = React.useState<Patient | undefined>(undefined);
  const [gender, setGender] = React.useState<GenderIcon | undefined>(undefined);
  const { id } = useParams<{ id: string }>();

  const setDisplayGender = () => {
    switch (patient?.gender) {
      case "male":
        setGender("man");
        break;
      case "female":
        setGender("woman");
        break;
      case "other":
        setGender("transgender alternate");
        break;
      default:
        break;
    }
  };

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        if (patient) {
          return;
        }
        const { data } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        setPatient(data);
        setDisplayGender();
      } catch (error) {
        console.error(error);
      }
    };
    void fetchPatient();
  }, []);

  React.useEffect(() => {
    void setDisplayGender();
  });

  return (
    <div>
      <Header as="h1">
        {patient?.name} <Icon name={gender} />
      </Header>
      <p>ssn: {patient?.ssn}</p>
      <p>occupation: {patient?.occupation}</p>
    </div>
  );
};

export default PatientDetailPage;
