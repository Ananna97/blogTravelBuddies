import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import PostDisplayCard from "./PostDisplayCard";

const PostFeed = ({ posts }) => {
    return (
        <div>
            {posts.map(post => (
                <PostDisplayCard key={post.id} post={post}/>
                ))}
        </div>
    );
};

export default PostFeed;
