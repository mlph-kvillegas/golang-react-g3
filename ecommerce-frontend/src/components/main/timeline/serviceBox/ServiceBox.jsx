import React from 'react'
import cx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import TextInfoCardContent from '@mui-treasury/components/cardContent/textInfo';
import { useFourThreeCardMediaStyles } from '@mui-treasury/styles/cardMedia/fourThree';
import { useText04CardContentStyles } from '@mui-treasury/styles/cardContent/text04';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';

const useStyles = makeStyles(() => ({
    root: {
        maxWidth: 400,
        margin: 'auto',
        borderRadius: 12,
        padding: 12,
      },
      media: {
        borderRadius: 6,
      },
  }))

function ServiceBox (props) {

    const styles = useStyles()
    const mediaStyles = useFourThreeCardMediaStyles();
    const textCardContentStyles = useText04CardContentStyles();
    const shadowStyles = useOverShadowStyles({ inactive: true });

    console.log(props);
    return (
        <Card className={cx(styles.root, shadowStyles.root)}>
            <CardMedia
                className={cx(styles.media, mediaStyles.root)} 
                image={
                    props.image
                }
            />
            <CardContent className={styles.content}>
                <TextInfoCardContent
                classes={textCardContentStyles}
                overline={props.price}
                heading={props.name}
                body={props.description}
                />
            </CardContent>
        </Card>
        
    )
}

export default ServiceBox