import { GetServerSidePropsContext } from 'next';
import axios from 'axios';

export const getDiscordProfileSocket = async (context: GetServerSidePropsContext) => {
    let url = `https://api.lanyard.rest/v1/users/391511241786654721`
    let { data: info } = await axios.get(url)
    return {
        props: { info }
    }
}