import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import HorizontalStepper from './HorizontalStepper';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
  media: {
    height: 140,
  },
});

const HomeHeader = () => {
  const classes = useStyles();

  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Ứng Dụng EXMIX - Trộn Đề Online
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Chào mừng bạn đến với ứng dụng trộn đề online EXMIX. Ứng dụng này sẽ giúp bạn trộn đề một cách nhanh chóng và miễn phí mà không cần tải phần mềm về máy.
          </Typography>
          <Grid>
              <HorizontalStepper/>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default HomeHeader;