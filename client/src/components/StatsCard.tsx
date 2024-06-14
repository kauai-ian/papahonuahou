import { Box, Icon, Text } from "@chakra-ui/react";

const StatCard: React.FC<{title: string; value: number; icon: React.ElementType}> = ({title, value, icon: Icon})=> (
    <Box border="1px solid teal.300" borderRadius="md" p={4} w="100%">
        <Box display='flex' alignItems='center' mb={2}>
            <Icon size='24px' color='teal.500' />
                <Text ml={2} fontWeight='bold' fontSize='lg' color='teal.300' >{title}</Text>
        </Box>
        <Text>{value}</Text>
    </Box>
)
export default StatCard