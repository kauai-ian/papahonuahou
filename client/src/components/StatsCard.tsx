import { Box, Text } from "@chakra-ui/react";

const StatCard: React.FC<{title: string; value: number; icon: React.ElementType, children: React.ReactNode}> = ({title, value, icon: Icon, children})=> (
    <Box borderRadius="md" p={4} w="100%" boxShadow='xl' bg='offWhite'>
        <Box display='flex' alignItems='center' flexDir='column' mb={2}>
            <Icon size='24px' color='teal' />
                <Text ml={2} fontWeight='bold' fontSize='lg' color='teal.300' >{title}</Text>
        </Box>
        <Text fontSize='2xl' color='teal.200'>{value}{" "}{children}</Text>
        
    </Box>
)
export default StatCard