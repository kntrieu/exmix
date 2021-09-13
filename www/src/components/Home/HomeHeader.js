import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import HorizontalStepper from './HorizontalStepper';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
  },
  media: {
    height: 140,
  },
});

const HomeHeader = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Ứng Dụng EXMIX - Trộn Đề Online
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Chào mừng bạn đến với ứng dụng trộn đề online EXMIX. Ứng dụng này sẽ giúp bạn trộn đề một cách nhanh chóng và miễn phí mà không cần tải phần mềm về máy.
          </Typography>

          <br/><br/>
          
          <Grid container spacing={3} direction="row" justify="center" alignItems="center">
            <Grid item xs={12}>
              <Typography gutterBottom variant="h5" component="h2" align="center">
                Bạn chỉ cần hoàn tất 4 bước để có bộ đề như ý
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={3} direction="row" justify="center" alignItems="center">
            <Grid item xs={12}>
              <HorizontalStepper/>
            </Grid>
          </Grid>
          <Grid container spacing={3} direction="row" justify="center" alignItems="center">
            <Grid item xs={3}>
              <Link to="/thong-tin-ki-thi" style={{ textDecoration: 'none' }}>
                <Typography className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary" variant="h6" component="h6">
                  Bắt Đầu Ngay!
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default HomeHeader;