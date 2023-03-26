type RatingProps = {
  rating: number;
  prefixCls: string;
  children?: JSX.Element;
}

const MAX_RATING = 5;

function Rating({ rating, prefixCls, children }: RatingProps): JSX.Element {
  const ratingStyleValue = Math.round(rating / MAX_RATING) * 100;

  return (
    <div className={`${prefixCls}__rating rating`}>
      <div className={`${prefixCls}__stars rating__stars`}>
        <span style={{ width: `${ratingStyleValue}%` }}></span>
        <span className="visually-hidden">Rating</span>
      </div>
      {children}
    </div>
  );
}

export default Rating;
