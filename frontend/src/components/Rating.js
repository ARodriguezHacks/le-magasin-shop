import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import StarIcon from "@material-ui/icons/Star";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import StarHalfIcon from "@material-ui/icons/StarHalf";

const useStyles = makeStyles({
  rating: {
    display: "flex",
    alignItems: "center",

    "& :nth-last-child(2)": {
      marginRight: "5px",
    },
  },

  ratingStar: {
    display: "inline-flex",
  },
});

const Rating = ({ value, text, color }) => {
  const classes = useStyles();
  return (
    <div className={classes.rating}>
      <span className={classes.ratingStar}>
        {value >= 1 ? (
          <StarIcon htmlColor={color} />
        ) : value >= 0.5 ? (
          <StarHalfIcon htmlColor={color} />
        ) : (
          <StarOutlineIcon htmlColor={color} />
        )}
      </span>
      <span className={classes.ratingStar}>
        {value >= 2 ? (
          <StarIcon htmlColor={color} />
        ) : value >= 1.5 ? (
          <StarHalfIcon htmlColor={color} />
        ) : (
          <StarOutlineIcon htmlColor={color} />
        )}
      </span>
      <span className={classes.ratingStar}>
        {value >= 3 ? (
          <StarIcon htmlColor={color} />
        ) : value >= 2.5 ? (
          <StarHalfIcon htmlColor={color} />
        ) : (
          <StarOutlineIcon htmlColor={color} />
        )}
      </span>
      <span className={classes.ratingStar}>
        {value >= 4 ? (
          <StarIcon htmlColor={color} />
        ) : value >= 3.5 ? (
          <StarHalfIcon htmlColor={color} />
        ) : (
          <StarOutlineIcon htmlColor={color} />
        )}
      </span>
      <span className={classes.ratingStar}>
        {value >= 5 ? (
          <StarIcon htmlColor={color} />
        ) : value >= 4.5 ? (
          <StarHalfIcon htmlColor={color} />
        ) : (
          <StarOutlineIcon htmlColor={color} />
        )}
      </span>
      <span>{text && text}</span>
    </div>
  );
};

Rating.defaultProps = {
  color: "#f8e825",
};

export default Rating;
