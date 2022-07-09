import { useEffect } from 'react'

import { useAuth } from '@redwoodjs/auth'
import { Form, Label, TextField, Submit, FieldError } from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

const ForgotPasswordPage = () => {
  const { isAuthenticated, forgotPassword } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  const onSubmit = async (data) => {
    const response = await forgotPassword(data.email)

    if (response.error) {
      toast.error(response.error)
    } else {
      // The function `forgotPassword.handler` in api/src/functions/auth.js has
      // been invoked, let the user know how to get the link to reset their
      // password (sent in email, perhaps?)
      toast.success(
        'A link to reset your password was sent to ' + response.email
      )
      navigate(routes.login())
    }
  }

  return (
    <>
      <MetaTags title="Forgot Password" />
      <main className="rw-main">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="rw-scaffold rw-login-container">
          <div className="rw-segment">
            <header className="rw-segment-header">
              <h2 className="rw-heading rw-heading-secondary">
                Forgot Password
              </h2>
            </header>
            <div className="rw-segment-main">
              <div className="rw-form-wrapper">
                <Form
                  className="rw-form-wrapper"
                  config={{ mode: 'onBlur' }}
                  onSubmit={onSubmit}
                >
                  <div className="text-left">
                    <Label
                      className="rw-label"
                      errorClassName="rw-label rw-label-error"
                      name="email"
                    >
                      Email
                    </Label>
                    <TextField
                      validation={{
                        required: {
                          value: true,
                          message: 'Email is required',
                        },
                        pattern: {
                          value: /^[^@]+@[^.]+\..+$/,
                          message: 'Please enter a valid email address',
                        },
                      }}
                      className="rw-input"
                      errorClassName="rw-input rw-input-error"
                      name="email"
                    />
                    <FieldError className="rw-field-error" name="email" />
                  </div>
                  <div className="rw-button-group">
                    <Submit className="rw-button rw-button-blue">Submit</Submit>
                  </div>
                </Form>
              </div>
            </div>
          </div>
          <div className="rw-login-link">
            <span>Go back to </span>
            <Link className="rw-link" to={routes.login()}>
              login
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}

export default ForgotPasswordPage
