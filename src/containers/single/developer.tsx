import * as React from 'react';
import styled from 'styled-components'

export default function render() {
    return (
        <div className="hero-unit developerCenter">
        <h1>Developer Center</h1>
        <p></p>
        <p>SaaSquatch is a full platform for running growth automation programs across web, mobile and all your digital properties.</p>

        <p>Getting started? <a href="/guides"><i className="fa fa-book"></i> Try one of our guides</a>.</p>

        <div className="row-fluid docs-sections">
        <div className="span3">
        <a href="/guides" className="">
        <i className="fa fas fa-code fa-3x"></i>
        <div>Developer Guides</div>
        </a>
        </div>
        <div className="span3">
        <a href="/developer/squatchjs" className="">
        <i className="fa fa-html5 fa-3x"></i>
        <div>Squatch.js</div>
        </a>
        </div>

        <div className="span3">
        <a href="/api" className="">
        <i className="fa fa-desktop fa-3x"></i>
        <div>REST API</div>
        </a>
        </div>
        <div className="span3">
        <a href="/mobile" className="">
        <i className="fa fa-tablet fa-3x"></i>
        <div>Mobile</div>
        </a>
        </div>
        </div>
        </div>
    )
}