import { useEffect } from 'react'

import { useAuth } from '@redwoodjs/auth'
import {
  Form,
  Label,
  TextField,
  PasswordField,
  Submit,
  FieldError,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

const LoginPage = () => {
  const { isAuthenticated, logIn } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  const onSubmit = async (data) => {
    const response = await logIn({ ...data })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('Welcome back!')
    }
  }

  return (
    <>
      <MetaTags title="Login" />

      <main className="rw-main">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="rw-scaffold rw-login-container">
          <div className="rw-segment">
            <header className="rw-segment-header">
              <h2 className="rw-heading rw-heading-secondary">Login</h2>
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
                  <div className="rw-forgot-link">
                    <Link
                      className="rw-forgot-link"
                      to={routes.forgotPassword()}
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <FieldError className="rw-field-error" name="password" />
                  <div className="rw-button-group">
                    <Submit className="rw-button rw-button-blue">Login</Submit>
                  </div>
                </Form>
              </div>
            </div>
          </div>
          <div className="rw-login-link">
            <span>Don&apos;t have an account?</span>{' '}
            <Link className="rw-link" to={routes.signup()}>
              Sign up!
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}

export default LoginPage
