import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  TextAreaField,
  Submit,
} from '@redwoodjs/forms'

const PostForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.post?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form error={props.error} onSubmit={onSubmit}>
        <FormError
          error={props.error}
          listClassName="rw-form-error-list"
          titleClassName="rw-form-error-title"
          wrapperClassName="rw-form-error-wrapper"
        />
        <Label
          className="rw-label"
          errorClassName="rw-label rw-label-error"
          name="title"
        >
          Title
        </Label>
        <TextField
          className="rw-input"
          defaultValue={props.post?.title}
          errorClassName="rw-input rw-input-error"
          name="title"
          validation={{ required: true }}
        />
        <FieldError className="rw-field-error" name="title" />
        <Label
          className="rw-label"
          errorClassName="rw-label rw-label-error"
          name="summary"
        >
          Summary
        </Label>
        <TextField
          className="rw-input"
          defaultValue={props.post?.summary}
          errorClassName="rw-input rw-input-error"
          name="summary"
          validation={{ required: true }}
        />
        <FieldError className="rw-field-error" name="summary" />
        <FieldError className="rw-field-error" name="slug" />
        <Label
          className="rw-label"
          errorClassName="rw-label rw-label-error"
          name="body"
        >
          Body
        </Label>
        <TextAreaField
          className="rw-input"
          defaultValue={props.post?.body}
          errorClassName="rw-input rw-input-error"
          name="body"
          rows={10}
          validation={{ required: true }}
        />
        <FieldError className="rw-field-error" name="body" />
        <div className="rw-button-group">
          <Submit className="rw-button rw-button-blue" disabled={props.loading}>
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default PostForm
