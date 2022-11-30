import { useRef } from 'react';
import { useRouter } from 'next/router';
import Card from '../../components/ui/Card';
import classes from './MeetupEdit.module.css';

function MeetupEdit(props) {
    const router = useRouter()
    const meetupId = router.query.meetupId

    const titleInputRef = useRef();
    const imageInputRef = useRef();
    const addressInputRef = useRef();
    const descriptionInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();
    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const meetupData = {
        id: meetupId,
      title: enteredTitle,
      image: enteredImage,
      address: enteredAddress,
      description: enteredDescription,
    };
    console.log(meetupData)
    props.onEditMeetup(meetupData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='title'>Meetup Title</label>
          <input type='text' required id='title' ref={titleInputRef} defaultValue={props.meetupData.title}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='image'>Meetup Image</label>
          <input type='url' required id='image' ref={imageInputRef} defaultValue={props.meetupData.image}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='address'>Address</label>
          <input type='text' required id='address' ref={addressInputRef} defaultValue={props.meetupData.address}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            required
            rows='5'
            ref={descriptionInputRef}
            defaultValue={props.meetupData.description}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Edit Meetup</button>
        </div>
      </form>
    </Card>
  );
}

export default MeetupEdit