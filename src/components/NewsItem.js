import { Card, Image, Text, Button, Group } from '@mantine/core';

export const NewsItem = ({ story, isExpanded, toggleExpanded }) => {
    return (
        <Card shadow="sm" padding="lg" style={{ marginBottom: 20 }}>
            {story.multimedia?.length > 0 && (
                <Card.Section>
                    <Image src={story.multimedia[0].url} height={160} alt={story.title} />
                </Card.Section>
            )}
            <Text weight={500} size="lg" style={{ marginTop: 20 }}>{story.title}</Text>
            <Text size="sm">
                {isExpanded ? story.abstract : `${story.abstract.substring(0, 100)}...`}
            </Text>
            <Group position="apart" style={{ marginTop: 20 }}>
                <Button variant="light" color="blue" onClick={toggleExpanded}>
                    {isExpanded ? 'Show Less' : 'Read More'}
                </Button>
                <Button component="a" href={story.url} target="_blank" rel="noopener noreferrer">
                    Go to article
                </Button>
            </Group>
        </Card>
    );
};

