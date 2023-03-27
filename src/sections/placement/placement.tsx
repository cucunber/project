import { colors } from "@/constants";
import { dataContacts, IContactsResponse } from "@/data";
import { defaultFetcher } from "@/utils";
import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import useSWR from "swr";

const transformPhone = (phone: string) => {
    const matches = phone.replace(/\D/g, '').match(/(\d)(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
    if(!matches){
        return phone;
    }
    const [_, code, operator, a, b, c] = matches;
    return `${code === '7' ? `+${code}` : code} (${operator}) ${a} ${b}-${c}`;
}

function CompanyPlacement ({ city, street, building }: IContactsResponse['place']) {
    return (
        <Flex direction="column">
            <Text>{city}</Text>
            <Text>{street} {building}</Text>
        </Flex>
    )
}

export function Placement() {
    const { data, error } = useSWR<IContactsResponse>(
      dataContacts.contacts,
      defaultFetcher
    );
  
    if (error) return <div>Error</div>;
    if (!data) return <Spinner />;
  
    const { place, phone } = data;
  
    const transformedPhone = transformPhone(phone)

    return (
      <Box>
        <Text as="a" href={`tel:${transformedPhone}`} sx={{
            fontSize: '20px',
            textDecoration: 'none',
            fontWeight: '500',
            color: colors.primary,
            _hover: {
                textDecoration: 'none',
            }
        }}>{transformedPhone}</Text>
        <CompanyPlacement {...place}/>
      </Box>
    );
  }