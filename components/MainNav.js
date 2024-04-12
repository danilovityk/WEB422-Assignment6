import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useRouter } from "next/router";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Link from "next/link";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { searchHistoryAtom } from '@/store'
import { useAtom } from 'jotai'
import { addToHistory } from "@/lib/userData";
import { removeToken, readToken } from "@/lib/authenticate";


export default function BasicExample() {
  const [field, setField] = useState();
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  let token = readToken()
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  function logout() {
    setIsExpanded(false)
    removeToken()
    router.push("/login");
  }

  async function submitForm(e) {
    e.preventDefault();
    setIsExpanded(false);
    setSearchHistory(await addToHistory(`title=true&q=${field}`)) 
    router.push("/artwork?title=true&q=" + field);
  }

  return (
    <>
      <Navbar
        expanded={isExpanded}
        expand="lg"
        className="fixed-top navbar-dark bg-primary"
      >
        <Container>
          <Navbar.Brand href="#home">Danylo Vityk</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setIsExpanded(!isExpanded)}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                onClick={() => setIsExpanded(false)}
                legacyBehavior
                passHref
                href="/"
                active={router.pathname === "/"}
              >
                Home
              </Nav.Link>

              {/* token start */}
              {token && (
                <Nav.Link
                  onClick={() => setIsExpanded(false)}
                  legacyBehavior
                  passHref
                  href="/search"
                  active={router.pathname === "/search"}
                >
                  Advanced Search
                </Nav.Link>
              )}
            </Nav>
            {!token && (
              <Nav>
                <Nav.Link
                  onClick={() => setIsExpanded(false)}
                  legacyBehavior
                  passHref
                  href="/login"
                  active={router.pathname === "/"}
                >
                  Login
                </Nav.Link>
                <Nav.Link
                  onClick={() => setIsExpanded(false)}
                  legacyBehavior
                  passHref
                  href="/register"
                  active={router.pathname === "/"}
                >
                  Register
                </Nav.Link>
              </Nav>
            )}
            &nbsp;{" "}
            {token && (
              <Form className="d-flex" onSubmit={submitForm}>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  value={field}
                  onChange={(e) => setField(e.target.value)}
                />
                <Button variant="outline-success" type="submit">
                  Search
                </Button>
              </Form>
            )}
            &nbsp;
            <Nav>
              {token && (
                <NavDropdown title={token.userName} id="basic-nav-dropdown">
                  <Link legacyBehavior passHref href="/favourites">
                    <NavDropdown.Item
                      onClick={() => setIsExpanded(false)}
                      
                    >
                      Favourites
                    </NavDropdown.Item>
                  </Link>

                  <Link legacyBehavior passHref href="/history">
                    <NavDropdown.Item
                      onClick={() => setIsExpanded(false)}
                      
                    >
                      History
                    </NavDropdown.Item>
                  </Link>

                  <NavDropdown.Item
                      onClick={() => logout()}
                    >
                      Log out
                    </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}
