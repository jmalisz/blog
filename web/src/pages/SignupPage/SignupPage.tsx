import { useEffect } from 'react'

import { useAuth } from '@redwoodjs/auth'
import {
  Form,
  Label,
  TextField,
  PasswordField,
  FieldError,
  Submit,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

const SignupPage = () => {
  const { isAuthenticated, signUp } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  const onSubmit = async (data) => {
    const response = await signUp({ ...data })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      // user is signed in automatically
      toast.success('Welcome!')
    }
  }

  return (
    <>
      <MetaTags title="Signup" />

      <main className="rw-main">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="rw-scaffold rw-login-container">
          <div className="rw-segment">
            <header className="rw-segment-header">
              <h2 className="rw-heading rw-heading-secondary">Signup</h2>
            </header>

            <div className="rw-segment-main">
              <div className="rw-form-wrapper">
                <Form
                  className="rw-form-wrapper"
                  config={{ mode: 'onBlur' }}
                  onSubmit={onSubmit}
                >
                  <Label
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                    name="username"
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
                    name="username"
                  />
                  <FieldError className="rw-field-error" name="username" />

                  <Label
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                    name="password"
                  >
                    Password
                  </Label>
                  <PasswordField
                    validation={{
                      required: {
                        value: true,
                        message: 'Password is required',
                      },
                    }}
                    autoComplete="current-password"
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    name="password"
                  />
                  <FieldError className="rw-field-error" name="password" />

                  <div className="rw-button-group">
                    <Submit className="rw-button rw-button-blue">
                      Sign Up
                    </Submit>
                  </div>
                </Form>
              </div>
            </div>
          </div>
          <div className="rw-login-link">
            <span>Already have an account?</span>{' '}
            <Link className="rw-link" to={routes.login()}>
              Log in!
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}

export default SignupPage
