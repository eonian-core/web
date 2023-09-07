import React, { useState, useCallback, useRef } from "react";

import { useForm, SubmitHandler, FieldError } from "react-hook-form"
import { EmailInput } from "./input";
import styles from "./waitlist-form.module.scss";
import Button from "../button/button";
import IconArrowRightShort from "../icons/icon-arrow-right-short";

import clsx from "clsx";
import { EmailLabel } from "./label";
import { useOnFocus, useOnHover } from "./state-hooks";

/**
 * Props for the WaitlistForm component.
 */
export interface WaitlistFormProps {
    /** Override state of error */
    error?: FieldError
    /**
     * Callback function that is invoked when the form is submitted.
     * @param email - The email entered in the form.
     */
    onSubmit: (email: string) => void
};

interface WaitlistInputs {
    email: string
}

export const WaitlistForm = ({ onSubmit, error }: WaitlistFormProps) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<WaitlistInputs>({ reValidateMode: "onSubmit" })

    const [isHovered, hoverProps] = useOnHover();
    const [isFocused, focusProps] = useOnFocus();
    const isActive = isHovered || isFocused || watch("email")?.length > 0;

    const registerProps = register("email", {
        required: "required",
        pattern: /\S+@\S+\.\S+/ // validate email format
    });
    
    return (
        <form
            {...hoverProps}
            className={clsx(styles.form, { [styles.active]: isActive })}
            onSubmit={handleSubmit((data: WaitlistInputs) => {
                onSubmit(data.email)
            })}>

            <div className={styles.container}>

                <EmailLabel error={errors.email || error} focused={isActive} />
                <EmailInput
                    id="email"
                    {...focusProps}
                    {...registerProps}
                    onBlur={(...args) => {
                        registerProps.onBlur(...args)
                        focusProps.onBlur()
                    }}
                />

                <Button
                    className={styles.submit}
                    round
                    gradient
                    type="submit"
                    icon={<IconArrowRightShort width="2.5rem" height="2.5rem" />}
                ></Button>
            </div>


        </form>
    )
}

